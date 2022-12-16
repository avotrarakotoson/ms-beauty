export interface CreateItemDto {
  label: string;
}

export interface UpdateItemDto extends CreateItemDto{
  id: number;
}