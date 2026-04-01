# Local Development via Podman (Steam Deck / Linux)
# Run these from the 'website/' directory.

.PHONY: build serve clean

build:
	podman run --rm \
		-v "$(shell pwd):/srv/jekyll" \
		docker.io/jekyll/jekyll:latest \
		jekyll build

serve:
	podman run --rm -it \
		-v "$(shell pwd):/srv/jekyll" \
		-p 4000:4000 \
		docker.io/jekyll/jekyll:latest \
		jekyll serve

clean:
	rm -rf _site .jekyll-cache Gemfile.lock
