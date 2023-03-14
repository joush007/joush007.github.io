git submodule update --remote
git add . || true
git commit -m "Update submodule" || true
git push origin || true