export const slugify = str =>
  str
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');

export const getProgramName = (programs, id) => {
  if (programs) {
    var potential = programs.find(
      (item) => item.id === parseInt(id)
    );
    if (potential) {
      return potential.name;
    } else {
      return "";
    }
  }
};

export const getPlatformName = (platforms, id) => {
  if (platforms) {
    var potential = platforms.find(
      (item) => item.id === parseInt(id)
    );
    if (potential) {
      return potential.name;
    } else {
      return "";
    }
  }
};