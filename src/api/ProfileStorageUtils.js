export default class ProfileStorageUtils {
  static getProfile() {
    let newProfile = JSON.parse(sessionStorage.getItem("profile-storage"));
    newProfile = newProfile === null ? [] : newProfile;

    newProfile = newProfile.sort((a, b) => (a.date < b.date ? 1 : -1));

    return newProfile;
  }

  static setNoteList(newProfile) {
    sessionStorage.setItem("profile-storage", JSON.stringify(newProfile));
  }
}
