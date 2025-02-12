#!/bin/bash

function make_request(){
    json=$1
    echo "Request:"
    echo "$json" | jq . 
    echo "Response:"
	echo
	echo
    curl -i \
        -H "Content-Type: application/json" \
        -d "$json" \
        http://localhost:3000/sign-up
	echo 
    echo "-------------------------------------"
}

# Korrekte Anfrage
json=$(cat <<EOF
{
    "username": "bob",
    "email": "bob@gbob.com",
    "password": "123456"
}
EOF
)
make_request "$json"

# Passwort zu kurz
json=$(cat <<EOF
{
    "username": "bob",
    "email": "bob@gbob.com",
    "password": "123"
}
EOF
)
make_request "$json"

# Ungültige E-Mail-Adresse
json=$(cat <<EOF
{
    "username": "bob",
    "email": "bob@gbob",
    "password": "123450"
}
EOF
)
make_request "$json"
