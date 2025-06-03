#!/bin/sh
docker build -t jcgardey/ux-questionnaire-front . --no-cache
docker push jcgardey/ux-questionnaire-front