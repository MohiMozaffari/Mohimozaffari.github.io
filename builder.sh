#!/bin/bash

# Install dependencies if needed
if [ ! -d "node_modules" ]; then
    echo -e "${BLUE}📦 Installing dependencies...${NC}"
    npm install
    echo ""
fi

# Install gh-pages if not already installed
if ! npm list gh-pages --depth=0 > /dev/null 2>&1; then
    echo -e "${BLUE}📦 Installing gh-pages deployment tool...${NC}"
    npm install --save-dev gh-pages
    echo ""
fi

# Build the project
echo -e "${BLUE}🔨 Building your beautiful AI-themed website...${NC}"
npm run build
