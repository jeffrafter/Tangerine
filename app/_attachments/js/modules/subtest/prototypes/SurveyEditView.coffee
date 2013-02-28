class SurveyEditView extends Backbone.View

  className: "SurveyEditView"

  events:
    'click .add_question'        : 'toggleAddQuestion'
    'click .add_question_cancel' : 'toggleAddQuestion'
    'click .add_question_add'    : 'addQuestion'
    'keypress #question_name'    : 'addQuestion'

  initialize: ( options ) ->
    @model = options.model
    @parent = options.parent
    @model.questions = new Questions
    @questionsEditView = new QuestionsEditView
      questions : @model.questions

    Utils.working true
    @model.questions.fetch
      key: @model.get "assessmentId"
      success: =>
        Utils.working false
        @questionsEditView.questions = new Questions(@model.questions.where {subtestId : @model.id  })
        @questionsEditView.questions.maintainOrder()

        @questionsEditView.on "question-edit", (questionId) => @trigger "question-edit", questionId
        @questionsEditView.questions.on "change", @renderQuestions
        @renderQuestions()
      erorr: (a, b) =>
        Utils.working false
        Utils.midAlert "Error<br>Could not load questions<br>#{a}, #{b}", 5000

  toggleAddQuestion: =>
    @$el.find("#add_question_form, .add_question").fadeToggle 250, =>
      if @$el.find("#add_question_form").is(":visible")
        @$el.find("#question_prompt").focus()
    return false

  addQuestion: (event) ->
    
    if event.type != "click" && event.which != 13
      return true
    
    newAttributes = $.extend Tangerine.templates.get("questionTemplate"),
      subtestId    : @model.id
      assessmentId : @model.get "assessmentId"
      id           : Utils.guid()
      order        : @questionsEditView.questions.length
      prompt       : @$el.find('#question_prompt').val()
      name         : @$el.find('#question_name').val().safetyDance()

    nq = @questionsEditView.questions.create newAttributes
    @renderQuestions()
    @$el.find("#add_question_form input").val ''
    @$el.find("#question_prompt").focus()

    return false

  isValid: -> true

  save: (options) ->

    options.questionSave = if options.questionSave then options.questionSave else true

    @model.set
      "gridLinkId"    : @$el.find("#link_select option:selected").val()
      "autostopLimit" : parseInt(@$el.find("#autostop_limit").val()) || 0

    # blank out our error queues
    notSaved = []
    emptyOptions = []
    requiresGrid = []

    # check for "errors"
    for question, i in @questionsEditView.questions.models
      if question.get("type") != "open" && question.get("options")?.length == 0
        emptyOptions.push i + 1
      
        if options.questionSave
          if not question.save()
            notSaved.push i
          if question.has("linkedGridScore") && question.get("linkedGridScore") != "" && question.get("linkedGridScore") != 0 && @model.has("gridLinkId") == "" && @model.get("gridLinkId") == ""
            requiresGrid.push i
        
    # display errors
    if notSaved.length != 0
      Utils.midAlert "Error<br><br>Questions: <br>#{notSaved.join(', ')}<br>not saved"
    if emptyOptions.length != 0
      plural = emptyOptions.length > 1
      _question = if plural then "Questions" else "Question"
      _has      = if plural then "have" else "has"
      alert "Warning\n\n#{_question} #{emptyOptions.join(' ,')} #{ _has } no options."
    if requiresGrid.length != 0
      plural = emptyOptions.length > 1
      _question = if plural then "Questions" else "Question"
      _require  = if plural then "require" else "requires"
      alert "Warning\n\n#{ _question } #{requiresGrid.join(' ,')} #{ _require } a grid to be linked to this test."


  onClose: ->
    @questionsListEdit?.close()

  renderQuestions: =>
    @questionsEditView?.render()

  render: ->
      
#    addQuestionSelect = "<select id='add_question_select'>"
#    for template in Tangerine.templates.optionTemplates
#      addQuestionSelect += "<option value='#{template.name}'>#{template.name}</option>"
#    addQuestionSelect += "</select>"

    gridLinkId = @model.get("gridLinkId") || ""
    autostopLimit = parseInt(@model.get("autostopLimit")) || 0

    @$el.html "
      <div class='label_value'>
        <label for='autostop_limit' title='The survey will discontinue after the first N questions have been answered with a &quot;0&quot; value option.'>Autostop after N incorrect</label><br>
        <input id='autostop_limit' type='number' value='#{autostopLimit}'>
      </div>
      <div id='grid_link'></div>
      <div id='questions'>
        <h2>Questions</h2>
        <div class='menu_box'>
          <div id='question_list_wrapper'><img class='loading' src='images/loading.gif'><ul></ul></div>
          <button class='add_question command'>Add Question</button>
          <div id='add_question_form' class='confirmation'>
            <div class='menu_box'>
              <h2>New Question</h2>
              <label for='question_prompt'>Prompt</label>
              <input id='question_prompt'>
              <label for='question_name'>Variable name</label>
              <input id='question_name' title='Allowed characters: A-Z, a-z, 0-9, and underscores.'><br>
              <button class='add_question_add command'>Add</button><button class='add_question_cancel command'>Cancel</button>
            </div>
          </div> 
        </div>
      </div>"

    @$el.find("#question_list_wrapper .loading").remove()
    @questionsEditView.setElement @$el.find("#question_list_wrapper ul")

    @renderQuestions()

    # get linked grid options
    subtests = new Subtests
    subtests.fetch
      key: @model.get "assessmentId"
      success: (collection) =>
        collection = collection.where
          prototype    : 'grid' # only grids can provide scores

        linkSelect = "
          <div class='label_value'>
            <label for='link_select'>Linked to grid</label><br>
            <div class='menu_box'>
              <select id='link_select'>
              <option value=''>None</option>"
        for subtest in collection
          linkSelect += "<option value='#{subtest.id}' #{if (gridLinkId == subtest.id) then 'selected' else ''}>#{subtest.get 'name'}</option>"
        linkSelect += "</select></div></div>"
        @$el.find('#grid_link').html linkSelect

