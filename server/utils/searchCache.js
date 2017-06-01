const terms = {}

const setTerm = (sessionId, term) => {
  terms[sessionId] = term
}

const getTerm = (sessionId) => {
  return terms[sessionId]
}
