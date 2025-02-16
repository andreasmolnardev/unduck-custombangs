# unduck-custombangs
This is a self-hosted version of t3dotgg/unduck

Did you ever want to use DuckDuckGo's bangs, but for EVERY search engine out there?

unduck-custombangs enables you to do exactly that.

## Self-host via Docker
See docker-compose.yml

Don't forget to enable cahing in your reverse proxy for optimal performance 

## Use a custom search engine
That's what the bind of `/app/src/bang.js:ro` is for.
You can copy /src/bang.js from the repo and add your custom search engines like that: 
`export const bangs = [`
`//Add your custom search engine here`
`{c: "COMMENT", d: "Address", r: "unique id", s:  "NAME",
sc:  "NAME_SHORT",
t:  "BANG",
u:  "Address, query replace with {{{s}}}"},`
`... (other search engines in bang.js)`

