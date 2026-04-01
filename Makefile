# Local Development via Podman (Steam Deck / Linux)
# Run these from the 'website/' directory.

.PHONY: build serve clean

build:
	podman run --rm \
		-v "$(shell pwd):/srv/jekyll:Z" \
		docker.io/jekyll/jekyll:latest \
		sh -c "chmod -R 777 /srv/jekyll && jekyll build"

serve:
	touch Gemfile.lock && chmod 666 Gemfile.lock
	podman run --rm -it \
		-v "$(shell pwd):/srv/jekyll" \
		-p 4000:4000 \
		docker.io/jekyll/jekyll:latest \
		jekyll serve

clean:
	rm -rf _site .jekyll-cache Gemfile.lock
