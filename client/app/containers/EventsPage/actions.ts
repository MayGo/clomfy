

/**
 * Load the repositories, this action starts the request saga
 *
 * @return {object} An action object with a type of LOAD_REPOS
 */
export function changePage() {
  return {
    type: "CHANGE_PAGE",
  };
}
