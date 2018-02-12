#!/bin/bash

PACKAGE_VERSION=$(cat package.json \
  | grep version \
  | head -1 \
  | awk -F: '{ print $2 }' \
  | sed 's/[",]//g')

dot_version=`echo $PACKAGE_VERSION | sed -E "s/-rc.*$//"`
dash_version=`echo ${dot_version} | tr '.' '_'`

RELEASE_NOTES_FILE="release_notes/v${dash_version}.html.md"

renogen --format markdown v${dot_version} >> ${RELEASE_NOTES_FILE}

mkdir change_log/v${dash_version}
mv change_log/next/* change_log/v${dash_version}/

cat ${RELEASE_NOTES_FILE}
