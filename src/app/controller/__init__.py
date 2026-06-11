from src.app.controller.quiz_controller import router as quiz_router
from src.app.controller.studant_controller import router as student_router
from src.app.controller.teacher_controller import router as teacher_router
from src.app.controller.auth_controler import router as auth
routers = [
    quiz_router,
    student_router,
    teacher_router,
    auth
    ]
