## Router Wrapper

- **`src/app/controller/__init__.py`** — Centralized registry that imports all routers and exports them as a `routers` list
- **`src/main.py`** — Now iterates over `routers` instead of importing a single router directly
- **`src/app/controller/request/student_request.py`** — Fixed `create_student()` and `update_student()` missing `(BaseModel)` inheritance
- **`src/app/controller/studant_controller.py`** — Fixed `@app.post` → `@router.post` and uncommented `return service.create()`

## Polymorphic Identity Fix

**Problem:** `polymorphic_identity` values were strings (`"STUDENT"`, `"TEACHER"`) but the `role` column is `Enum(user_role)` — SQLAlchemy compared enum values from the database against strings and raised `AssertionError: No such polymorphic_identity`.

**Fix:** Changed `polymorphic_identity` to use enum values (`user_role.STUDENT`, `user_role.TEACHER`) in `Student.py` and `Teacher.py`. Removed `polymorphic_identity` from the base `User.py` to avoid duplicate identity warnings.
