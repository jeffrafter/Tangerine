// Generated by CoffeeScript 1.6.3
var byCollection, dashboardResults, resultsByAssessmentId;

byCollection = function(doc) {
  if (doc.collection) {
    return emit(doc.collection, doc);
  }
};

dashboardResults = function(doc) {
  var i, label, prototype, result, subtest, _i, _j, _len, _len1, _ref, _ref1;
  if (doc.collection !== "result") {
    return;
  }
  result = {
    resultId: doc._id,
    enumerator: doc.enumerator,
    assessmentName: doc.assessmentName,
    startTime: doc.start_time,
    tangerineVersion: doc.tangerine_version,
    numberOfSubtests: doc.subtestData.length,
    subtests: []
  };
  _ref = doc.subtestData;
  for (_i = 0, _len = _ref.length; _i < _len; _i++) {
    subtest = _ref[_i];
    if (subtest.name) {
      result.subtests.push(subtest.name);
    }
    prototype = subtest.prototype;
    if (prototype === "id") {
      result.id = subtest.data.participant_id;
    }
    if (prototype === "location") {
      _ref1 = subtest.data.labels;
      for (i = _j = 0, _len1 = _ref1.length; _j < _len1; i = ++_j) {
        label = _ref1[i];
        result["Location: " + label] = subtest.data.location[i];
      }
    }
  }
  return emit(doc.assessmentId, result);
};

resultsByAssessmentId = function(doc) {
  var id;
  if (doc.collection !== 'result') {
    return;
  }
  id = doc.assessmentId || doc.klassId;
  return emit(id, null);
};