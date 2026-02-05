import { axios } from "@/lib/axios";

export const deleteAddress = async (addressId: string): Promise<void> => {
  await axios.delete(`/addresses/${addressId}`);
};
