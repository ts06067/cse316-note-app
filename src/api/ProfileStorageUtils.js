export default class ProfileStorageUtils {
  static getProfile() {
    let newProfile = JSON.parse(sessionStorage.getItem("profile-storage"));
    newProfile = newProfile === null ? [] : newProfile;

    return newProfile;
  }

  static setProfile(newProfile) {
    console.log("setting profile...");

    sessionStorage.setItem("profile-storage", JSON.stringify(newProfile));
  }

  static getProfileImage() {
    let profile = this.getProfile();
    return profile.image;
  }

  static getProfileName() {
    let profile = this.getProfile();
    return profile.name;
  }
}
