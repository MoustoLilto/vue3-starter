#!/bin/bash

SRC_ROOT=$1
ARTIFACT_NAME=$2
NEXUS_SNAPSHOT_URL=$3
NEXUS_RELEASE_URL=$4

cd "${SRC_ROOT}" || exit
pwd

APP_VERSION=$(node -p "require('./package.json').version")
echo "Project version = ${APP_VERSION}"

if [ "${CI_ENVIRONMENT_NAME}" == "prod" ]
then
    VERSION_TYPE="RELEASE"
    NEXUS_URL="${NEXUS_RELEASE_URL}"
    REF="master"
    IMAGE_VERSION="IMAGE_PRD_VERSION"

elif [ "${CI_ENVIRONMENT_NAME}" == "ppr" ]
then
    GIT_TAG="PPR"
    VERSION_TYPE="RELEASE"
    NEXUS_URL="${NEXUS_RELEASE_URL}"
    REF="${CI_ENVIRONMENT_NAME}"
    IMAGE_VERSION="IMAGE_PPR_VERSION"

else
    GIT_TAG="REC"
    VERSION_TYPE="SNAPSHOT"
    NEXUS_URL="${NEXUS_SNAPSHOT_URL}"
    REF="${CI_ENVIRONMENT_NAME}"
    IMAGE_VERSION="IMAGE_REC_VERSION"
fi

ARTIFACT_ID="${ARTIFACT_NAME}-${CI_ENVIRONMENT_NAME}"
ARTIFACT_VERSION="${APP_VERSION}.${CI_PIPELINE_IID}-${VERSION_TYPE}"

echo "Deployment of ${ARTIFACT_ID} artifact, version ${ARTIFACT_VERSION} to nexus.."
/appli/ci-vuejs-release/docker-vuejs-release.sh dist.zip \
    "${ARTIFACT_ID}" \
    "${ARTIFACT_VERSION}" \
    "${VERSION_TYPE}" \
|| exit $?
echo "Nexus Deployment is successful!"


echo "Trigger of terraform pipeline for environnement: ${CI_ENVIRONMENT_NAME}..."
curl -X POST --fail \
    -F token="${TOKEN}" \
    -F ref="${REF}" \
    -F "variables[ZIP_LINK]"="${NEXUS_URL}-${CI_ENVIRONMENT_NAME}/${ARTIFACT_VERSION}" \
    -F "variables[ZIP_NAME]"="${ARTIFACT_ID}-${ARTIFACT_VERSION}.zip" \
    -F "variables[${IMAGE_VERSION}]"="${ARTIFACT_VERSION}" \
    "${GITLAB_PIPELINE_API}" \
|| exit $?
echo "Trigger of terraform pipeline is successful!"

if [ "${CI_ENVIRONMENT_NAME}" != "prod" ]
then
    echo "Update of git tag..."
    git remote show origin
    git remote set-url --push origin git@gitlab.engie-cofely.net:"$CI_PROJECT_PATH"
    git remote show origin
    git tag "${GIT_TAG}" --force
    git push --tags --force origin HEAD:"$CI_COMMIT_REF_NAME"
    echo "Git tag updated successfuly!"
fi