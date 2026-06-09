# FOLDER STRUCTURE
```
.view/
    |-src -> core of react
        |- assets -> .png,.jpeg and etc, to help enchance the components
        |- components -> react components
            |- AdminMenu.tsx -> Node ID: R6ZZu
            |- CreateNewQuiz.tsx -> Node ID: t1W47
            |- Footer -> .pen: Node ID: F92o8
            |- Header -> .pen :  Node ID: msK4q
            |- Home.tsx -> unified home, renders guest or admin based on role prop
            |- QuizCard.tsx -> Node ID: SBR6j (guest list card)
            |- QuizCardAdmin.tsx -> Node ID: h89SPH (admin list card)

        |- pages
            |- newquizform.tsx -> Node ID: mnpa0
            |- quizdetail-> Node ID: C50pVv
```

# CURRENT STATE

- `Home.tsx` is a single component that adapts based on `role` prop
- Guest mode: Header -> list of QuizCard -> Footer
- Admin mode: Header -> AdminMenu (3 tabs: Quizzes/Teachers/Answers) -> list of QuizCardAdmin + CreateNewQuiz -> Footer
- Only the Quizzes tab has content; Teachers and Answers show Empty state
- QuizThumb was removed (replaced by list-style QuizCard/QuizCardAdmin)
- Icons in AdminMenu and QuizCardAdmin are placeholders (24x24 divs) - add them later
