#!/bin/bash

function make_request(){
	json=$1
	echo "Request:"
	echo $json | jq .
	echo "Response:"
	curl -i \
	-H "Content-Type: application/json" \
	-H "Authorization: Bearer $JWT" \
	-d "$json" \
	http://localhost:3000/create-customer
}

#correct request
json=$(cat << EOF
{
	"vorname": "bob",
	"name": "musterman",
	"straße": "hauptstr",
	"hausnummer": 3,
	"wohnort": "hinteremsbach",
	"telefon": "01234/123477",
	"geburtsdatum": "01-01-1989"
}
EOF
)

make_request "$json" 
