# Local Development via Podman (Steam Deck / Linux)
# Run these from the 'website/' directory.

.PHONY: build serve stop status clean

# Container Name
CNAME=eliminator-jekyll

build:
	podman run --rm \
		-v "$(shell pwd):/srv/jekyll:Z" \
		docker.io/jekyll/jekyll:latest \
		sh -c "chmod -R 777 /srv/jekyll && jekyll build"

serve:
	touch Gemfile.lock && chmod 666 Gemfile.lock
	@echo "Starting Jekyll in background..."
	podman run -d --rm \
		--name $(CNAME) \
		-v "$(shell pwd):/srv/jekyll" \
		-p 4000:4000 \
		docker.io/jekyll/jekyll:latest \
		jekyll serve
	@echo "Server starting. Use 'make status' to see logs."

stop:
	@echo "Stopping $(CNAME)..."
	podman stop $(CNAME) || true

status:
	podman logs -f $(CNAME)

clean:
	rm -rf _site .jekyll-cache Gemfile.lock
