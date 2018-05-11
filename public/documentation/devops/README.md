

# DevOps
The contents of `.travis.yml`, which drives the Travis CI integration, can be found below.

First, we declare the language of the app, the nodeJS runtime, and elect to cache the contents of `node_modules`.

The `script` section defines a simple `bash` script which determines the branch we are operating on from `$TRAVIS_BRANCH`. This information is used to determine if we should create a `dev` or `prod` build of the application, and which S3 bucket to deploy the result to.

The `deploy` section will execute only for those branches which meet the condition. In our case, that is only `develop` and `master`. Only when code is pushed to these branches (and is not a pull request) will the S3 deployment be performed. Note that the deployment depends on the value of `$BUCKET` which was set by the `script` section.

Finally, the values for `$AWS_ACCESS_KEY_ID`, `$AWS_SECRET_KEY`, and `$AWS_DEFAULT_REGION` are supplied by environment variables configured on [the Travis CI job](https://travis-ci.org/brianvanstone/grinder-data).

```
language: node_js
node_js:
  - "6.10.3"
cache:
  directories:
  - node_modules
before_install:
  - pip install --user awscli
  - export PATH=$PATH:$HOME/.local/bin
script:
  - if [ "$TRAVIS_BRANCH" = "master" ]; then
      npm run build;
      export BUCKET=project-elephant;
    else
      npm run build-dev;
      export BUCKET=project-elephant-dev;
    fi
deploy:
  on:
    all_branches: true
    condition: $TRAVIS_BRANCH =~ ^master|develop$
  provider: s3
  access_key_id: $AWS_ACCESS_KEY_ID
  secret_access_key: $AWS_SECRET_KEY
  bucket: $BUCKET
  skip_cleanup: true
  local_dir: build
  cache_control: "max-age=21600"
  region: $AWS_DEFAULT_REGION
```

## Branching and Merging
- Default branch: `master`
- Development branch: `develop`
- Feature branches: `feature/feature-name-here`

## Build Triggers
- Every time code is pushed to any branch other than `develop` and `master`
    - `npm run build-dev` is performed
- Every time code is pushed to `develop`
    - `npm run build-dev` is performed
    - The contents of `/build` are pushed to dev S3
- Every time code is pushed to `master`
    - `npm run build` is performed and pushed to prod S3
    - The contents of `/build` are pushed to prod S3

## Process Diagram
[Process Diagram](/documentation/devops/branchProcess.png)