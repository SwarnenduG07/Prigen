 
pub fn upload_file(
  Extension(app_state): Extension<Arc<AppState>>,
  Extension(user): Extension<JWTAuthMiddeware>,
  mut mutipart: Multipart
) -> Result<impl IntoResponse, HttpError> {
   let mut file_Data = Vec::new();
   let mut file_name = String::new();
   
   let mut file_size: i64 = 0;
   let mut = form_data = FileUploadDtos {
       recipient_email: String::new(),
       password: String::new(),
       expiration_date: String::new(),
   };

   while let Some(field) = multipart.next_field().await.unwrap() {
    let name = field.name().unwrap().to_string();

    match name.as_str() {
      "fileUpload" => {
        file_name = field.file_name().unwrap_or("unknow_file").to_string();
        file_date = field.bytes().await.unwrap().to_vec();
        file_size = file_data.lem() as i64;
      },
      "recipient_email" => {
        form_data.recipient_email = field.text().await.unwrap();
      },
      "password" => {
        form_data.password = field.text().await.unwrap();
    },
    "expiration_date" => {
        form_data.expiration_date = field.text().await.unwrap();
     },
      _ => {}
      }
   }
   form_data.validate()
      .map_err(|e| HttpError::bad_request(e.to_string()))?;

   let recipient_result = app_state.db_client
      .get_user(None, None, Some(&form_data.recipient_email))
      .await
      .map_err(|e| HttpError::bad_request(e.to_string()))?;

   let recipient_user = recipient_result.ok_or(HttpError::bad_request("Recipient user not found"))?;

   let public_key_str = match &recipient_user.public_key {
    Some(key) => key,
    None => return Err(HttpError::bad_request("Recipient user has no ublic key")),
   };
   let public_key_bytes = STANDARD.decode(public_key_str)
   .map_err(|e| HttpError::server_error(e.to_string()))?;

let public_key = String::from_utf8(public_key_bytes)
   .map_err(|e| HttpError::server_error(e.to_string()))?;

let public_key_pem = RsaPublicKey::from_pkcs1_pem(&public_key)
   .map_err(|e| HttpError::server_error(e.to_string()))?;

let (
    encrypted_aes_key,
    encrypted_data,
    iv
) = encrypt_file(file_data, &public_key_pem).await?;

let user_id = uuid::Uuid::parse_str(&user.user.id.to_string()).unwrap();

let hash_password = password::hash(&form_data.password)
    .map_err(|e| HttpError::server_error(e.to_string()))?;

let expiration_date = DateTime::parse_from_rfc3339(&form_data.expiration_date)
    .map_err(|e| HttpError::server_error(e.to_string()))?
    .with_timezone(&Utc);

let recipient_user_id = uuid::Uuid::parse_str(&recipient_user.id.to_string()).unwrap();

app_state.db_client
    .save_encrypted_file(
        user_id.clone(),
        file_name, 
        file_size, 
        recipient_user_id, 
        hash_password, 
        expiration_date, 
        encrypted_aes_key, 
        encrypted_data, 
        iv
    )
    .await
    .map_err(|e| HttpError::server_error(e.to_string()))?;

let response = ResponseDto {
    message: "File uploaded and encrypted successfully".to_string(),
    status: "success"
};

Ok(Json(response))
}