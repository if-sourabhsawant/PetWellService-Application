export function flattenVeterinaryData(data) {
  return {
    veterinaryId: data.veterinaryId,
    userId: data.user.userId,
    firstName: data.user.firstName.trim(),
    lastName: data.user.lastName.trim(),
    phoneNo: data.user.phoneNo,
    password: data.user.password,
    email: data.user.email,
    aadharNo: data.user.aadharNo,
    address: data.user.address,
    cityId: data.city.cityId,
    cityName: data.city.cityName,
    areaId: data.area.areaId,
    areaName: data.area.areaName,
    roleId: data.user.role.roleId,
    roleName: data.user.role.roleName,
    specialization: data.specialization,
    experience: data.experience,
    licenseNo: data.licenseNo,
    clinicName: data.clinicName,
    clinicPhoneNo: data.clinicPhoneNo,
    clinicAddress: data.clinicAddress,
    noOfSlots: data.noOfSlots,
    status: data.status,
    slots: data.slots,
  };
}

export function flattenObject(obj, parentKey = "", result = {}) {
  for (let key in obj) {
    
    if (obj.hasOwnProperty(key)) {
      const newKey = parentKey ? `${parentKey}.${key}` : key;

      if (typeof obj[key] === "object" && obj[key] !== null && !Array.isArray(obj[key])) {
        flattenObject(obj[key], newKey, result);
      } else {
        result[newKey] = obj[key];
      }
    }
  }
  return result;
}

export const flattenGroomerData = (groomer) => {
  return {
    groomerId: groomer.groomerId,
    firstName: groomer.user.firstName,
    lastName: groomer.user.lastName,
    phoneNo: groomer.user.phoneNo,
    email: groomer.user.email,
    aadharNo: groomer.user.aadharNo,
    address: groomer.user.address,
    cityId: groomer.user.city.cityId,
    cityName: groomer.user.city.cityName,
    areaId: groomer.user.area.areaId,
    areaName: groomer.user.area.areaName,
    shopName: groomer.shopName,
    rating: groomer.rating,
    shopPhoneNo: groomer.shopPhoneNo,
    shopAddress: groomer.shopAddress,
    noOfSlots: groomer.noOfSlots,
    status: groomer.status,
  };
};


export function handleAxiosError(error) {
  if (!error.response) {
    return { status: false, message: "Network not available. Please check your internet connection.", error };
  }
  if (error.response.status >= 400 && error.response.status < 500) {
    return { status: false, message: `Request denied: ${error.response.data.message || "Invalid request"}`, error };
  }
  return { status: false, message: "An unexpected error occurred. Please try again later.", error };
}
