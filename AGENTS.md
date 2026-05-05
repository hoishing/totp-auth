- Be straightforward and direct, don't predict my emotions or assume context I haven't given.
- Do not write unit tests until you are explicity told to do so.
- Do create e2e tests and always update them upon UI or feature changes.
- Remove tests when the original UI / feature is removed.
- Version bump workflow: edit the pyproject.toml/package.json -> commit all files with message summarized the code changes -> push -> build -> publish. Do not run tests.

## Scripting for agent skills

- Prefer python over other languages.
- Always use `uv` instead of `pip`.
- Always use `ruff` and `basedpyright` to improve code quality, install them locally if not globally available.
- Avoid installing dependencies to the python runtime, use `uv` with inline metadata format to declare dependencies.
