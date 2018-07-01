export const chosenSections = (sections) => {
  // Return action
  return {
    // Unique identifier
    type: 'CHOSEN_SECTIONS',
    // Payload
    sections
  }
};

export const chosenCategories = (categories) => {
  // Return action
  return {
    // Unique identifier
    type: 'CHOSEN_CATEGORIES',
    // Payload
    categories
  }
};

export const startYear = year => ({
  type: 'START_YEAR',
  year
});

export const endYear = year => ({
  type: 'END_YEAR',
  year
});