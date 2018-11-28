export const formBuilderConfig = {
    appLabel : 'Workflow Builder',
    viewJSON : true,
    operations : [
        {
            id : "task",
            container:"tasks",
            label: "Add Task",
            inputType : "form",
            defaultFields : [
                {
                    label: "Task Sequence",
                    inputType : "select",
                    defaultValue : 1,
                    values : [
                        1,2,3
                    ],
                    helperText:""
                }
            ],
            defaultInputLabel : "Task",
            canDelete : true,
            operations : [
                {
                    id : "assignee",
                    container:"fields",
                    label: "Add Assignee",
                    inputType : "autocomplete",
                    defaultInputLabel : "Assignee",
                    defaultInputValue : "Anup Singh",
                    autoCompleteConfig : "assignee",
                    canDelete : true,
                },
                {
                    id : "field",
                    container:"fields",
                    label: "Add Field",
                    inputType : "text",
                    defaultInputLabel : "Comment",
                    defaultInputValue : "Test Comment",
                    canDelete : true,
                },
                {
                    id : "dueDate",
                    container:"fields",
                    label: "Add Due Date",
                    inputType : "date",
                    defaultInputLabel : "Due Date",
                    defaultInputValue : new Date().toISOString().substr(0,10),
                    canDelete : true,
                }
            ]
        }
    ],
    autoCompleteConfig : {
        assignee : {
            values : [
                {label:"Marcus Larsson",value:"Marcus Larsson"},
                {label:"Peter Skogsberg", value:"Peter Skogsberg"},
                {label:"Magnus Falkman", value:"Magnus Falkman"},
                {label:"Anup Singh", value:"Anup Singh"},
                {label:"Anders Axelsson", value:"Anders Axelsson"}
            ],
        }
    }
}