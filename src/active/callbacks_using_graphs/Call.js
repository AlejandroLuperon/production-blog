class Call {
  constructor(payload, retriever, dependents) {
    this.valPayload = payload;
    this.valRetriever = retriever;
    this.valDependents = dependents;

  }

  set payload(payload) {
    this.valPayload = payload;
  }

  get payload() {
    return this.valPayload;;
  }

  set retriever(retriever) {
    this.valRetriever = retriever;
  }

  get retriever() {
    return this.valRetriever;
  }

  set dependents(dependents) {
    this.valDependents = dependents;
  }

  get dependents() {
    return this.valDependents;
  }
}

var test = new Call(null, null, null);
test.payload = "A";

console.log(test.payload);
