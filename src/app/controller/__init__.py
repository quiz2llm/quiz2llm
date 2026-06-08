from src.app.controller.controller import router as quiz_router
from src.app.controller.studant_controller import router as student_router
from src.app.controller.teacher_controller import router as teacher_router

routers = [
    quiz_router,
    student_router,
    teacher_router
]
