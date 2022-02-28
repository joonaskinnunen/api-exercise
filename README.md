API documentation: [https://joonas.stoplight.io/docs/sell-buy/YXBpOjc4MTA4MA-api](https://joonas.stoplight.io/docs/sell-buy/YXBpOjc4MTA4MA-api)

{
  "openapi": "3.1.0",
  "info": {
    "title": "api",
    "version": "1.0",
    "summary": "Api",
    "description": ""
  },
  "servers": [
    {
      "url": "https://sell-buy.herokuapp.com/api"
    }
  ],
  "paths": {
    "/users": {
      "post": {
        "summary": "Create New User",
        "operationId": "post-user",
        "responses": {
          "200": {
            "description": "User Created",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/User"
                },
                "examples": {}
              }
            }
          },
          "400": {
            "description": "\"error\": \"username must be unique\"\nOR\n\"error\": \"required information missing\""
          }
        },
        "requestBody": {
          "content": {
            "application/json": {
              "schema": {
                "type": "object",
                "properties": {
                  "usename": {
                    "type": "string",
                    "example": "someuser"
                  },
                  "name": {
                    "type": "string",
                    "example": "Matti Meikäläinen"
                  },
                  "password": {
                    "type": "string",
                    "example": "password12345"
                  },
                  "phone": {
                    "type": "string",
                    "example": "040545445454"
                  },
                  "email": {
                    "type": "string",
                    "example": "email@somedomain.com"
                  }
                },
                "required": [
                  "usename",
                  "name",
                  "password",
                  "phone",
                  "email"
                ]
              },
              "examples": {
                "example-1": {
                  "value": {
                    "usename": "someuser",
                    "name": "Matti Meikäläinen",
                    "password": "password12345",
                    "phone": "040545445454",
                    "email": "email@somedomain.com"
                  }
                }
              }
            }
          },
          "description": "Post the necessary fields for the API to create a new user."
        },
        "description": "Create a new user."
      },
      "parameters": []
    },
    "/listings": {
      "get": {
        "summary": "GET all listings",
        "tags": [],
        "responses": {
          "200": {
            "description": "OK",
            "content": {
              "application/json": {
                "schema": {
                  "type": "array",
                  "items": {
                    "type": "object",
                    "properties": {
                      "title": {
                        "type": "string"
                      },
                      "description": {
                        "type": "string"
                      },
                      "category": {
                        "type": "string"
                      },
                      "location": {
                        "type": "string"
                      },
                      "images": {
                        "type": "array",
                        "items": {
                          "type": "string"
                        }
                      },
                      "price": {
                        "type": "number"
                      },
                      "date": {
                        "type": "string"
                      },
                      "user": {
                        "$ref": "#/components/schemas/User"
                      },
                      "id": {
                        "type": "string"
                      }
                    }
                  }
                },
                "examples": {
                  "example-1": {
                    "value": [
                      {
                        "title": "string",
                        "description": "string",
                        "category": "string",
                        "location": "string",
                        "images": [
                          "string"
                        ],
                        "price": 0,
                        "date": "string",
                        "user": {
                          "name": "string",
                          "phone": "string",
                          "email": "string",
                          "id": "string"
                        },
                        "id": "string"
                      },
                      {
                        "title": "string",
                        "description": "string",
                        "category": "string",
                        "location": "string",
                        "images": [
                          "string"
                        ],
                        "price": 0,
                        "date": "string",
                        "user": {
                          "name": "string",
                          "phone": "string",
                          "email": "string",
                          "id": "string"
                        },
                        "id": "string"
                      }
                    ]
                  }
                }
              },
              "application/xml": {
                "schema": {
                  "type": "object",
                  "properties": {}
                }
              },
              "multipart/form-data": {
                "schema": {
                  "type": "object",
                  "properties": {}
                }
              },
              "text/html": {
                "schema": {
                  "type": "array",
                  "items": {
                    "type": "object",
                    "properties": {
                      "title": {
                        "type": "string"
                      },
                      "description": {
                        "type": "string"
                      },
                      "category": {
                        "type": "string"
                      },
                      "location": {
                        "type": "string"
                      },
                      "images": {
                        "type": [
                          "string",
                          "array"
                        ],
                        "items": {
                          "type": "string"
                        }
                      },
                      "price": {
                        "type": "number"
                      },
                      "": {
                        "type": "string"
                      }
                    }
                  }
                }
              }
            }
          }
        },
        "operationId": "get-listings",
        "description": "Get all listings"
      },
      "post": {
        "summary": "",
        "operationId": "post-listings",
        "responses": {
          "200": {
            "description": "OK",
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "properties": {
                    "title": {
                      "type": "string",
                      "example": "Toy car"
                    },
                    "description": {
                      "type": "string",
                      "example": "Great toy car"
                    },
                    "category": {
                      "type": "string",
                      "example": "toys"
                    },
                    "location": {
                      "type": "string",
                      "example": "new york"
                    },
                    "images": {
                      "type": "array",
                      "items": {
                        "type": "string",
                        "example": "[\"https://somedomain.com/image.jpg\", \"https://otherdomain.com/otherimage.png\"]"
                      }
                    },
                    "price": {
                      "type": "number",
                      "example": 22
                    },
                    "deliverytype": {
                      "type": "string",
                      "example": "shipping"
                    }
                  },
                  "required": [
                    "title",
                    "description",
                    "category",
                    "location",
                    "price",
                    "deliverytype"
                  ]
                },
                "examples": {
                  "example-1": {
                    "value": {
                      "title": "Toy car",
                      "description": "Great toy car",
                      "category": "toys",
                      "location": "new york",
                      "images": [
                        "https://somedomain.com/image.jpg",
                        "https://otherdomain.com/otherimage.png"
                      ],
                      "price": 22,
                      "deliverytype": "shipping"
                    }
                  }
                }
              }
            },
            "headers": {}
          },
          "400": {
            "description": "Bad Request"
          },
          "401": {
            "description": "Unauthorized"
          }
        },
        "parameters": [
          {
            "schema": {
              "type": "string",
              "example": "Authorization: Bearer token12345"
            },
            "in": "header",
            "name": "Authorization",
            "required": true,
            "description": "Bearer Auth"
          }
        ],
        "description": "Post new listing. You must provide authorization token in header."
      }
    },
    "/listings/{listingID}": {
      "parameters": [
        {
          "schema": {
            "type": "string"
          },
          "name": "listingID",
          "in": "path",
          "required": true
        }
      ],
      "get": {
        "summary": "GET single listing",
        "tags": [],
        "responses": {
          "200": {
            "description": "OK",
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "properties": {
                    "title": {
                      "type": "string",
                      "example": "Toy car"
                    },
                    "description": {
                      "type": "string",
                      "example": "Great toy car"
                    },
                    "category": {
                      "type": "string",
                      "example": "toys"
                    },
                    "location": {
                      "type": "string",
                      "example": "Oulu"
                    },
                    "images": {
                      "type": "array",
                      "items": {
                        "type": "string",
                        "example": "[\"http://somedomain.com/image.jpeg\", http://otherdomain.com/otherimage.png\"]"
                      }
                    },
                    "price": {
                      "type": "number",
                      "example": 33
                    },
                    "date": {
                      "type": "string",
                      "example": "28022022"
                    },
                    "deliverytype": {
                      "type": "string",
                      "example": "shipping"
                    },
                    "user": {
                      "$ref": "#/components/schemas/User"
                    },
                    "id": {
                      "type": "string",
                      "example": "dsf98989dssdfds"
                    }
                  }
                },
                "examples": {
                  "example-1": {
                    "value": {
                      "title": "Toy car",
                      "description": "Great toy car",
                      "category": "toys",
                      "location": "Oulu",
                      "images": [
                        "http://somedomain.com/image.jpeg",
                        "http://otherdomain.com/otherimage.png"
                      ],
                      "price": 33,
                      "date": "28022022",
                      "deliverytype": "shipping",
                      "user": {
                        "username": "string",
                        "name": "string",
                        "phone": "string",
                        "email": "string",
                        "listings": [
                          {}
                        ],
                        "id": "string"
                      },
                      "id": "dsf98989dssdfds"
                    }
                  }
                }
              }
            }
          },
          "400": {
            "description": "Bad Request"
          },
          "404": {
            "description": "Not Found"
          }
        },
        "operationId": "get-listings-listingID",
        "description": "Get single listing by ID"
      },
      "put": {
        "summary": "",
        "operationId": "put-listings-listingID",
        "responses": {
          "200": {
            "description": "OK",
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "properties": {
                    "title": {
                      "type": "string"
                    },
                    "description": {
                      "type": "string"
                    },
                    "category": {
                      "type": "string"
                    },
                    "location": {
                      "type": "string"
                    },
                    "images": {
                      "type": "string"
                    },
                    "price": {
                      "type": "string"
                    },
                    "deliverytype": {
                      "type": "string"
                    }
                  }
                }
              }
            }
          },
          "400": {
            "description": "Bad Request"
          },
          "401": {
            "description": "Unauthorized"
          }
        },
        "parameters": [
          {
            "schema": {
              "type": "string",
              "example": "bearer token12345"
            },
            "in": "header",
            "name": "Authorization",
            "description": "Bearer token",
            "required": true
          }
        ],
        "description": "Provide bearer token in the Authorization header.\nAll body fields are optional. Only provided fiels will be updated."
      },
      "delete": {
        "summary": "",
        "operationId": "delete-listings-listingID",
        "responses": {
          "200": {
            "description": "OK",
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "properties": {
                    "title": {
                      "type": "string"
                    },
                    "description": {
                      "type": "string"
                    },
                    "category": {
                      "type": "string"
                    },
                    "location": {
                      "type": "string"
                    },
                    "images": {
                      "type": "array",
                      "items": {
                        "type": "string"
                      }
                    },
                    "price": {
                      "type": "number"
                    },
                    "date": {
                      "type": "string"
                    },
                    "deliverytype": {
                      "type": "string"
                    },
                    "user": {
                      "type": "string"
                    },
                    "id": {
                      "type": "string"
                    }
                  }
                }
              }
            }
          },
          "400": {
            "description": "Bad Request"
          },
          "401": {
            "description": "Unauthorized"
          },
          "404": {
            "description": "Not Found"
          }
        },
        "description": "Delete listing.\nProvide bearer token in the Authorization header.",
        "parameters": [
          {
            "schema": {
              "type": "string",
              "example": "bearer token12345"
            },
            "in": "header",
            "name": "Authorization",
            "description": "Bearer token",
            "required": true
          }
        ]
      }
    },
    "/listings/location/{location}": {
      "parameters": [
        {
          "schema": {
            "type": "string"
          },
          "name": "location",
          "in": "path",
          "required": true
        }
      ],
      "get": {
        "summary": "GET listings by location",
        "tags": [],
        "responses": {
          "200": {
            "description": "OK",
            "content": {
              "application/json": {
                "schema": {
                  "type": "array",
                  "items": {
                    "type": "object",
                    "properties": {
                      "title": {
                        "type": "string",
                        "example": "Toy car"
                      },
                      "desctiption": {
                        "type": "string",
                        "example": "Great toy car"
                      },
                      "category": {
                        "type": "string",
                        "example": "toys"
                      },
                      "location": {
                        "type": "string",
                        "example": "Oulu"
                      },
                      "images": {
                        "type": "array",
                        "items": {
                          "type": "string",
                          "example": "[\"https://domain.com/image.jpg\", https://otherdomain.com/otherimage.jpeg\"]"
                        }
                      },
                      "price": {
                        "type": "string",
                        "example": "22"
                      },
                      "date": {
                        "type": "string",
                        "example": "28022022"
                      },
                      "user": {
                        "$ref": "#/components/schemas/User"
                      },
                      "id": {
                        "type": "string"
                      }
                    }
                  }
                },
                "examples": {
                  "example-1": {
                    "value": [
                      {
                        "title": "Toy car",
                        "desctiption": "Great toy car",
                        "category": "toys",
                        "location": "Oulu",
                        "images": [
                          "https://domain.com/image.jpg",
                          "https://otherdomain.com/otherimage.jpeg"
                        ],
                        "price": "22",
                        "date": "28022022",
                        "user": {
                          "name": "string",
                          "phone": "string",
                          "email": "string",
                          "id": "string"
                        },
                        "id": "string"
                      },
                      {
                        "title": "Toy car",
                        "desctiption": "Great toy car",
                        "category": "toys",
                        "location": "Oulu",
                        "images": [
                          "https://domain.com/image.jpg",
                          "https://otherdomain.com/otherimage.jpeg"
                        ],
                        "price": "22",
                        "date": "28022022",
                        "user": {
                          "name": "string",
                          "phone": "string",
                          "email": "string",
                          "id": "string"
                        },
                        "id": "string"
                      }
                    ]
                  }
                }
              }
            }
          }
        },
        "operationId": "get-listings-location",
        "description": "Get all listings from spesified location"
      }
    },
    "/listings/category/{category}": {
      "parameters": [
        {
          "schema": {
            "type": "string"
          },
          "name": "category",
          "in": "path",
          "required": true
        }
      ],
      "get": {
        "summary": "GET listings by category",
        "tags": [],
        "responses": {
          "200": {
            "description": "OK",
            "content": {
              "application/json": {
                "schema": {
                  "type": "array",
                  "items": {
                    "type": "object",
                    "properties": {
                      "title": {
                        "type": "string",
                        "example": "Toy car"
                      },
                      "desctiption": {
                        "type": "string",
                        "example": "Great toy car"
                      },
                      "category": {
                        "type": "string",
                        "example": "toys"
                      },
                      "location": {
                        "type": "string",
                        "example": "Oulu"
                      },
                      "images": {
                        "type": "array",
                        "items": {
                          "type": "string",
                          "example": "[\"https://domain.com/image.jpg\", https://otherdomain.com/otherimage.jpeg\"]"
                        }
                      },
                      "price": {
                        "type": "string",
                        "example": "22"
                      },
                      "date": {
                        "type": "string",
                        "example": "28022022"
                      },
                      "user": {
                        "$ref": "#/components/schemas/User"
                      },
                      "id": {
                        "type": "string"
                      }
                    }
                  }
                },
                "examples": {
                  "example-1": {
                    "value": [
                      {
                        "title": "Toy car",
                        "desctiption": "Great toy car",
                        "category": "toys",
                        "location": "Oulu",
                        "images": [
                          "https://domain.com/image.jpg",
                          "https://otherdomain.com/otherimage.jpeg"
                        ],
                        "price": "22",
                        "date": "28022022",
                        "user": {
                          "name": "string",
                          "phone": "string",
                          "email": "string",
                          "id": "string"
                        },
                        "id": "string"
                      },
                      {
                        "title": "Toy car",
                        "desctiption": "Great toy car",
                        "category": "toys",
                        "location": "Oulu",
                        "images": [
                          "https://domain.com/image.jpg",
                          "https://otherdomain.com/otherimage.jpeg"
                        ],
                        "price": "22",
                        "date": "28022022",
                        "user": {
                          "name": "string",
                          "phone": "string",
                          "email": "string",
                          "id": "string"
                        },
                        "id": "string"
                      }
                    ]
                  }
                }
              }
            }
          }
        },
        "operationId": "get-listings-category",
        "description": "Get all listings in spesified category"
      }
    },
    "/listings/date/{date}": {
      "parameters": [
        {
          "schema": {
            "type": "string"
          },
          "name": "date",
          "in": "path",
          "required": true
        }
      ],
      "get": {
        "summary": "GET listings by date",
        "tags": [],
        "responses": {
          "200": {
            "description": "OK",
            "content": {
              "application/json": {
                "schema": {
                  "type": "array",
                  "items": {
                    "type": "object",
                    "properties": {
                      "title": {
                        "type": "string",
                        "example": "Toy car"
                      },
                      "desctiption": {
                        "type": "string",
                        "example": "Great toy car"
                      },
                      "category": {
                        "type": "string",
                        "example": "toys"
                      },
                      "location": {
                        "type": "string",
                        "example": "Oulu"
                      },
                      "images": {
                        "type": "array",
                        "items": {
                          "type": "string",
                          "example": "[\"https://domain.com/image.jpg\", https://otherdomain.com/otherimage.jpeg\"]"
                        }
                      },
                      "price": {
                        "type": "string",
                        "example": "22"
                      },
                      "date": {
                        "type": "string",
                        "example": "28022022"
                      },
                      "user": {
                        "$ref": "#/components/schemas/User"
                      },
                      "id": {
                        "type": "string"
                      }
                    }
                  }
                },
                "examples": {
                  "example-1": {
                    "value": [
                      {
                        "title": "Toy car",
                        "desctiption": "Great toy car",
                        "category": "toys",
                        "location": "Oulu",
                        "images": [
                          "https://domain.com/image.jpg",
                          "https://otherdomain.com/otherimage.jpeg"
                        ],
                        "price": "22",
                        "date": "28022022",
                        "user": {
                          "name": "string",
                          "phone": "string",
                          "email": "string",
                          "id": "string"
                        },
                        "id": "string"
                      },
                      {
                        "title": "Toy car",
                        "desctiption": "Great toy car",
                        "category": "toys",
                        "location": "Oulu",
                        "images": [
                          "https://domain.com/image.jpg",
                          "https://otherdomain.com/otherimage.jpeg"
                        ],
                        "price": "22",
                        "date": "28022022",
                        "user": {
                          "name": "string",
                          "phone": "string",
                          "email": "string",
                          "id": "string"
                        },
                        "id": "string"
                      }
                    ]
                  }
                }
              }
            }
          }
        },
        "operationId": "get-listings-date",
        "description": "Get all listings with specified date. Example: /listings/date/20220226"
      }
    },
    "/login": {
      "post": {
        "summary": "Login",
        "operationId": "post-login",
        "responses": {
          "200": {
            "description": "OK",
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "properties": {
                    "token": {
                      "type": "string",
                      "example": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZS"
                    },
                    "username": {
                      "type": "string",
                      "example": "kayttaja123"
                    },
                    "name": {
                      "type": "string",
                      "example": "Teppo Testaaja"
                    }
                  }
                }
              }
            }
          },
          "400": {
            "description": "Bad Request\n\"error\": \"required information missing\""
          },
          "401": {
            "description": "Unauthorized\n\"error\": \"invalid username or password\"",
            "content": {
              "application/json": {
                "schema": {
                  "type": "object"
                }
              }
            }
          }
        },
        "description": "Login to application.\nSuccessful login returns bearer token which can used to create, modify and delete user postings.",
        "requestBody": {
          "content": {
            "application/json": {
              "schema": {
                "type": "object",
                "properties": {
                  "username": {
                    "type": "string",
                    "example": "kayttaja123"
                  },
                  "password": {
                    "type": "string",
                    "example": "salasana123"
                  }
                },
                "required": [
                  "username",
                  "password"
                ]
              }
            }
          }
        }
      }
    }
  },
  "components": {
    "schemas": {
      "User": {
        "description": "",
        "type": "object",
        "x-examples": {
          "example-1": {
            "username": "kinnjo",
            "name": "Joonas Kinnunen",
            "phone": "045985495849",
            "email": "email@gmail.com",
            "listings": [],
            "id": "61e9b16e28bc626f06805458"
          }
        },
        "properties": {
          "username": {
            "type": "string",
            "minLength": 1
          },
          "name": {
            "type": "string",
            "minLength": 1
          },
          "phone": {
            "type": "string",
            "minLength": 1
          },
          "email": {
            "type": "string",
            "minLength": 1
          },
          "listings": {
            "type": "array",
            "items": {
              "type": "object"
            }
          },
          "id": {
            "type": "string",
            "minLength": 1
          }
        },
        "required": [
          "username",
          "name",
          "phone",
          "email",
          "listings",
          "id"
        ]
      },
      "Listing": {
        "title": "Listing",
        "type": "object",
        "examples": [
          {
            "title": "string"
          }
        ],
        "properties": {
          "title": {
            "type": "string"
          },
          "description": {
            "type": "string"
          },
          "category": {
            "type": "string"
          },
          "location": {
            "type": "string"
          },
          "images": {
            "type": "array",
            "items": {
              "type": "string"
            }
          },
          "price": {
            "type": "number"
          },
          "date": {
            "type": "string"
          },
          "deliverytype": {
            "type": "string"
          },
          "User": {
            "$ref": ""
          }
        }
      }
    },
    "securitySchemes": {}
  }
}