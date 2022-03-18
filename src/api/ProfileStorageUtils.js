export default class ProfileStorageUtils {
  static getProfile() {
    let newProfile = JSON.parse(localStorage.getItem("profile-storage"));
    newProfile = newProfile === null ? [] : newProfile;

    return newProfile;
  }

  static setProfile(newProfile) {
    console.log("setting profile...");

    localStorage.setItem("profile-storage", JSON.stringify(newProfile));
  }

  static getProfileImage() {
    let profile = this.getProfile();
    return profile.image;
  }

  static getProfileName() {
    let profile = this.getProfile();
    return profile.name;
  }

  static getProfileColorScheme() {
    let profile = this.getProfile();
    return profile.colorScheme;
  }
}
