git submodule update --remote --merge
git add . || true
git commit -m "Update submodule" || true
git push origin || true