import { createSelector } from 'reselect';

const getQualities = ({ user: { qualities } }) => qualities;

export const getQualityCategories = createSelector(
  [getQualities],
  (qualities) => {
    const categories = [...new Set(qualities.map(q => q.category))];
    return categories.map(name => ({
      name: name,
      qualities: qualities.filter(q => q.category === name),
    }))
  },
)