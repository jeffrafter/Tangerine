class Results extends Backbone.Collection

  url : "result"
  model : Result
#  view: "resultsByAssessmentId"
#  db: PouchDB('tangerine')
  pouch:
    fetch: 'query'
    options:
      query:
        fun:  resultsByAssessmentId
#    view: "resultsByAssessmentId"
  parse: 	(response) ->
    return response[0]

  comparator: (model) ->
    model.get('start_time') || 0

  # By default include the docs
  fetch: (options) ->
    options = {} unless options?
    options.include_docs = true unless options.include_docs?
    super(options)