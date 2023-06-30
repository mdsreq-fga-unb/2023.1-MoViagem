// Request DTOs

export interface EditUserRequestDTO {
  name: string;
  email: string;
}

export interface EditPasswordRequestDTO {
  currentPassword: string;
  newPassword: string;
}

// Response DTOs
