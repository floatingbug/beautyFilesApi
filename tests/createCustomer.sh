#!/bin/bash

function make_request(){
	json=$1
	jwt=$2
	echo "Request:"
	echo $json | jq .
	echo "Response:"
	curl -i \
	-H "Content-Type: application/json" \
	-H "Authorization: Bearer $JWT" \
	-d $json \
	http://localhost:3000/create-customer
}

#correct request
json=$(cat << EOF
{
	"id": 1,
	"vorname": "bob",
	"name": "musterman",
	"straße": "hauptstr",
	"hausnummer": 3,
	"wohnort": "hinteremsbach",
	"telefon": 01234/123477,
	"Geburtsdatum": 1989
}
EOF
)

make_request $json 
