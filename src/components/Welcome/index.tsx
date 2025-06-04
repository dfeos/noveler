import React from 'react';
import { Container, Text, Card, Icon, Button, Banner } from '../../ui-library';
import './welcome.css';

const Welcome: React.FC = () => {
  return (
    <Container size="xl" className="py-8">
      <div className="space-y-12">
        {/* Header */}
        <div className="text-center">
          <Text variant="h1" className="mb-4">Welcome to Novel Writer</Text>
          <Text variant="body" color="secondary" className="text-lg">
            Your comprehensive tool for writing novels with advanced project management
          </Text>
        </div>

        {/* Getting Started Banner */}
        <Banner variant="info" icon="info">
          <strong>Get Started:</strong> Create your first project by clicking the "➕" button in the Projects tab
        </Banner>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card variant="elevated" hoverable>
            <div className="p-6 text-center">
              <div className="text-4xl mb-4">📚</div>
              <Text variant="h3" className="mb-3">Project Management</Text>
              <Text variant="body" color="secondary">
                Organize your novels into projects with multiple chapters and detailed tracking
              </Text>
            </div>
          </Card>

          <Card variant="elevated" hoverable>
            <div className="p-6 text-center">
              <div className="text-4xl mb-4">📖</div>
              <Text variant="h3" className="mb-3">Chapter Organization</Text>
              <Text variant="body" color="secondary">
                Break down your story into manageable chapters with individual word counts
              </Text>
            </div>
          </Card>

          <Card variant="elevated" hoverable>
            <div className="p-6 text-center">
              <div className="text-4xl mb-4">👥</div>
              <Text variant="h3" className="mb-3">Character Management</Text>
              <Text variant="body" color="secondary">
                Create detailed character profiles with backgrounds, personalities, and notes
              </Text>
            </div>
          </Card>

          <Card variant="elevated" hoverable>
            <div className="p-6 text-center">
              <div className="text-4xl mb-4">✏️</div>
              <Text variant="h3" className="mb-3">Rich Text Editor</Text>
              <Text variant="body" color="secondary">
                Write with formatting tools, keyboard shortcuts, and distraction-free modes
              </Text>
            </div>
          </Card>

          <Card variant="elevated" hoverable>
            <div className="p-6 text-center">
              <div className="text-4xl mb-4">🔍</div>
              <Text variant="h3" className="mb-3">Find & Replace</Text>
              <Text variant="body" color="secondary">
                Powerful text search and replacement across your entire manuscript
              </Text>
            </div>
          </Card>

          <Card variant="elevated" hoverable>
            <div className="p-6 text-center">
              <div className="text-4xl mb-4">💾</div>
              <Text variant="h3" className="mb-3">Auto-Save</Text>
              <Text variant="body" color="secondary">
                Never lose your work with automatic saving and local storage backup
              </Text>
            </div>
          </Card>
        </div>

        {/* Getting Started Card */}
        <Card variant="outlined">
          <div className="p-6">
            <Text variant="h2" className="mb-4 flex items-center">
              <Icon name="check" color="success" className="mr-2" />
              Get Started
            </Text>
            <Text variant="body" color="secondary" className="mb-6">
              Create your first project to begin writing your novel
            </Text>
            
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <div className="bg-blue-100 text-blue-800 rounded-full w-8 h-8 flex items-center justify-center text-sm font-semibold">
                  1
                </div>
                <Text variant="body">Click the "➕" button in the Projects tab</Text>
              </div>
              <div className="flex items-start space-x-3">
                <div className="bg-blue-100 text-blue-800 rounded-full w-8 h-8 flex items-center justify-center text-sm font-semibold">
                  2
                </div>
                <Text variant="body">Enter your project title and description</Text>
              </div>
              <div className="flex items-start space-x-3">
                <div className="bg-blue-100 text-blue-800 rounded-full w-8 h-8 flex items-center justify-center text-sm font-semibold">
                  3
                </div>
                <Text variant="body">Start adding chapters and characters</Text>
              </div>
            </div>
          </div>
        </Card>

        {/* Keyboard Shortcuts */}
        <Card variant="outlined">
          <div className="p-6">
            <Text variant="h2" className="mb-4">⌨️ Keyboard Shortcuts</Text>
            <Text variant="body" color="secondary" className="mb-6">
              Master these shortcuts to write more efficiently
            </Text>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex justify-between items-center py-2">
                <div className="flex space-x-1">
                  <kbd className="px-2 py-1 bg-gray-100 text-gray-800 rounded text-sm">F1</kbd>
                  <span className="text-gray-500">or</span>
                  <kbd className="px-2 py-1 bg-gray-100 text-gray-800 rounded text-sm">Ctrl</kbd>
                  <span className="text-gray-500">+</span>
                  <kbd className="px-2 py-1 bg-gray-100 text-gray-800 rounded text-sm">/</kbd>
                </div>
                <Text variant="body" className="text-right">Show all shortcuts</Text>
              </div>
              
              <div className="flex justify-between items-center py-2">
                <div className="flex space-x-1">
                  <kbd className="px-2 py-1 bg-gray-100 text-gray-800 rounded text-sm">Ctrl</kbd>
                  <span className="text-gray-500">+</span>
                  <kbd className="px-2 py-1 bg-gray-100 text-gray-800 rounded text-sm">S</kbd>
                </div>
                <Text variant="body" className="text-right">Save project</Text>
              </div>
              
              <div className="flex justify-between items-center py-2">
                <div className="flex space-x-1">
                  <kbd className="px-2 py-1 bg-gray-100 text-gray-800 rounded text-sm">Ctrl</kbd>
                  <span className="text-gray-500">+</span>
                  <kbd className="px-2 py-1 bg-gray-100 text-gray-800 rounded text-sm">Shift</kbd>
                  <span className="text-gray-500">+</span>
                  <kbd className="px-2 py-1 bg-gray-100 text-gray-800 rounded text-sm">N</kbd>
                </div>
                <Text variant="body" className="text-right">New chapter</Text>
              </div>
              
              <div className="flex justify-between items-center py-2">
                <div className="flex space-x-1">
                  <kbd className="px-2 py-1 bg-gray-100 text-gray-800 rounded text-sm">Ctrl</kbd>
                  <span className="text-gray-500">+</span>
                  <kbd className="px-2 py-1 bg-gray-100 text-gray-800 rounded text-sm">Shift</kbd>
                  <span className="text-gray-500">+</span>
                  <kbd className="px-2 py-1 bg-gray-100 text-gray-800 rounded text-sm">Enter</kbd>
                </div>
                <Text variant="body" className="text-right">Fullscreen mode</Text>
              </div>
            </div>
          </div>
        </Card>

        {/* Pro Tips */}
        <Card variant="outlined">
          <div className="p-6">
            <Text variant="h2" className="mb-4">💡 Pro Tips</Text>
            <div className="space-y-3">
              <div className="flex items-start space-x-2">
                <Icon name="check" color="success" className="mt-1 flex-shrink-0" />
                <Text variant="body">
                  <strong>Character Details:</strong> Click on any character to view and edit their detailed profile
                </Text>
              </div>
              <div className="flex items-start space-x-2">
                <Icon name="check" color="success" className="mt-1 flex-shrink-0" />
                <Text variant="body">
                  <strong>Chapter Navigation:</strong> Use Alt + Arrow keys to navigate between paragraphs quickly
                </Text>
              </div>
              <div className="flex items-start space-x-2">
                <Icon name="check" color="success" className="mt-1 flex-shrink-0" />
                <Text variant="body">
                  <strong>Focus Mode:</strong> Toggle fullscreen mode for distraction-free writing
                </Text>
              </div>
              <div className="flex items-start space-x-2">
                <Icon name="check" color="success" className="mt-1 flex-shrink-0" />
                <Text variant="body">
                  <strong>Search Characters:</strong> Use the search box in the Characters tab to quickly find specific characters
                </Text>
              </div>
              <div className="flex items-start space-x-2">
                <Icon name="check" color="success" className="mt-1 flex-shrink-0" />
                <Text variant="body">
                  <strong>Organize:</strong> Drag and drop chapters to reorder them within your project
                </Text>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </Container>
  );
};

export default Welcome;
