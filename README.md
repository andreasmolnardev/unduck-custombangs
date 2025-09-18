# unduck-custombangs
This is a self-hosted version of t3dotgg/unduck

Did you ever want to use DuckDuckGo's bangs, but for EVERY search engine out there? And what about ones that are not part of DuckDuckGo's bang library?

unduck-custombangs enables you to do exactly that.

## Self-host via Docker
See docker-compose.yml

Don't forget to enable caching in your reverse proxy for optimal performance 

Also, some features (accessing the clipboard) require HTTPS

## The config.json file
The config file is located at /app/config/config.json

This is where:
- Your custom bang can be configured for the whole instance
- Custom Bangs can be added 

If you want to customize your config, you can mount /app/config/config.json to YOUR config.json file. 

It should contain: 
- defaultBang, f. ex. "ddg" for DuckDuckGo
-  an array of your customBangs, each one as follows: 

    {"bangWithoutExclamationMark":  "bang_here", "searchUrl":  "https://my-search-engine.test/?q={{{s}}}"}

Note that the query has been replaced with {{{s}}}

## Problems, Suggestions, or anything else why you'd wanna reach out to me?
Simply open an issue. I will work on it ASAP.
