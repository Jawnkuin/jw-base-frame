export default function getProjection (fieldNode) {
  return fieldNode.selectionSet.selections.reduce((projections, selection) => {
    projections[selection.name.value] = 1;
    return projections;
  }, {});
}
