#!/bin/bash

# Minkuchi Project Setup Script
echo "🚀 Setting up Minkuchi - Modern AI Review Platform"
echo "================================================="

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js first."
    exit 1
fi

# Check if npm is installed
if ! command -v npm &> /dev/null; then
    echo "❌ npm is not installed. Please install npm first."
    exit 1
fi

echo "✅ Node.js and npm are installed"

# Install dependencies
echo "📦 Installing dependencies..."
npm install

# Setup Prisma database
echo "🗄️ Setting up database..."
npx prisma generate
npx prisma db push

# Build the project
echo "🔨 Building the project..."
npm run build

echo ""
echo "🎉 Setup completed successfully!"
echo "📝 Quick start commands:"
echo "   npm run dev    - Start development server"
echo "   npm run build  - Build for production"
echo "   npm start      - Start production server"
echo ""
echo "🌐 The application will be available at: http://localhost:3000"
echo "💫 Enjoy your modern AI-powered review platform!"