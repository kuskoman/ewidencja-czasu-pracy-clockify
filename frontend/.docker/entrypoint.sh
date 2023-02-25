#! /bin/sh

set -euo pipefail

echo "Templating app-config.json"
envsubst < /usr/local/app-config.template.json > /usr/local/apache2/htdocs/assets/app-config.json
echo "Templating app-config.json done"

echo "Starting Apache"
httpd-foreground
