#!/bin/bash

if [ $# -eq 0 ]; then
  echo "Usage: $0 <final version>"
  echo "  version          - The tag version e.g. [1.2.3]"
  exit 1
fi

dot_version=`echo $1 | sed -E "s/.rc.*$//"`
dash_version=`echo ${dot_version} | tr '.' '_'`

if [ "${dot_version:0:1}" == "v" ] ; then
  echo 'Error: Version prefix must not start with v!'
  exit 1
fi

RELEASE_NOTES_FILE="change_log/v${dash_version}.html.md"

renogen --format markdown v${dot_version} >> ${RELEASE_NOTES_FILE}


mkdir change_log/v${dash_version}
mv change_log/next/* change_log/v${dash_version}/

cat ${RELEASE_NOTES_FILE}

