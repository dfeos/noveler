import React, { useState } from 'react';
import {
  Banner,
  Button,
  Card,
  Container,
  Icon,
  Input,
  Label,
  Modal,
  Text,
  TextEditor
} from '../ui-library';

const UIShowcase: React.FC = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [textEditorValue, setTextEditorValue] = useState('');
  const [inputValue, setInputValue] = useState('');

  return (
    <Container size="xl" className="py-8">
      <div className="space-y-12">
        {/* Header */}
        <div className="text-center">
          <Text variant="h1" className="mb-4">UI Library Showcase</Text>
          <Text variant="body" color="secondary">
            Comprehensive showcase of all UI components
          </Text>
        </div>

        {/* Banners Section */}
        <Card>
          <div className="p-6">
            <Text variant="h2" className="mb-6">Banners</Text>
            <div className="space-y-4">
              <Banner variant="info" icon="info">
                This is an informational banner
              </Banner>
              <Banner variant="success" icon="success" onDismiss={() => {}}>
                Success! Your changes have been saved.
              </Banner>
              <Banner variant="warning" icon="warning">
                Warning: This action cannot be undone.
              </Banner>
              <Banner variant="error" icon="error" title="Error">
                Something went wrong. Please try again.
              </Banner>
            </div>
          </div>
        </Card>

        {/* Buttons Section */}
        <Card>
          <div className="p-6">
            <Text variant="h2" className="mb-6">Buttons</Text>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              
              {/* Variants */}
              <div>
                <Text variant="h3" className="mb-4">Variants</Text>
                <div className="space-y-2">
                  <Button variant="primary">Primary</Button>
                  <Button variant="secondary">Secondary</Button>
                  <Button variant="danger">Danger</Button>
                  <Button variant="outline">Outline</Button>
                  <Button variant="ghost">Ghost</Button>
                </div>
              </div>

              {/* Sizes */}
              <div>
                <Text variant="h3" className="mb-4">Sizes</Text>
                <div className="space-y-2">
                  <Button size="xs">Extra Small</Button>
                  <Button size="sm">Small</Button>
                  <Button size="md">Medium</Button>
                  <Button size="lg">Large</Button>
                  <Button size="xl">Extra Large</Button>
                </div>
              </div>

              {/* States */}
              <div>
                <Text variant="h3" className="mb-4">States</Text>
                <div className="space-y-2">
                  <Button>Normal</Button>
                  <Button loading>Loading</Button>
                  <Button disabled>Disabled</Button>
                  <Button fullWidth>Full Width</Button>
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* Cards Section */}
        <Card>
          <div className="p-6">
            <Text variant="h2" className="mb-6">Cards</Text>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card variant="default">
                <div className="p-4">
                  <Text variant="h3" className="mb-2">Default Card</Text>
                  <Text variant="body">Basic card with default styling.</Text>
                </div>
              </Card>
              
              <Card variant="elevated" hoverable>
                <div className="p-4">
                  <Text variant="h3" className="mb-2">Elevated Card</Text>
                  <Text variant="body">Card with shadow and hover effect.</Text>
                </div>
              </Card>
              
              <Card variant="outlined" rounded>
                <div className="p-4">
                  <Text variant="h3" className="mb-2">Outlined Card</Text>
                  <Text variant="body">Card with border styling.</Text>
                </div>
              </Card>
            </div>
          </div>
        </Card>

        {/* Form Elements Section */}
        <Card>
          <div className="p-6">
            <Text variant="h2" className="mb-6">Form Elements</Text>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              
              {/* Inputs */}
              <div>
                <Text variant="h3" className="mb-4">Inputs</Text>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="input1">Default Input</Label>
                    <Input 
                      id="input1"
                      placeholder="Enter text..." 
                      value={inputValue}
                      onChange={(e) => setInputValue(e.target.value)}
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="input2" size="sm">Small Input</Label>
                    <Input 
                      id="input2"
                      size="sm" 
                      placeholder="Small input" 
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="input3">Large Input</Label>
                    <Input 
                      id="input3"
                      size="lg" 
                      placeholder="Large input" 
                    />
                  </div>

                  <div>
                    <Label htmlFor="input4">Error State</Label>
                    <Input 
                      id="input4"
                      error 
                      placeholder="Error input" 
                    />
                  </div>

                  <div>
                    <Label htmlFor="input5">Success State</Label>
                    <Input 
                      id="input5"
                      success 
                      placeholder="Success input" 
                    />
                  </div>
                </div>
              </div>

              {/* Labels */}
              <div>
                <Text variant="h3" className="mb-4">Labels</Text>
                <div className="space-y-3">
                  <Label size="xs">Extra Small Label</Label>
                  <Label size="sm">Small Label</Label>
                  <Label size="md">Medium Label</Label>
                  <Label size="lg">Large Label</Label>
                  <Label required>Required Label</Label>
                  <Label disabled>Disabled Label</Label>
                  <Label inline>Inline Label</Label>
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* Text Section */}
        <Card>
          <div className="p-6">
            <Text variant="h2" className="mb-6">Typography</Text>
            <div className="space-y-4">
              <Text variant="h1">Heading 1</Text>
              <Text variant="h2">Heading 2</Text>
              <Text variant="h3">Heading 3</Text>
              <Text variant="h4">Heading 4</Text>
              <Text variant="h5">Heading 5</Text>
              <Text variant="h6">Heading 6</Text>
              <Text variant="body">Body text with normal weight and spacing.</Text>
              <Text variant="p">Paragraph text for longer content blocks.</Text>
              <Text variant="small">Small text for disclaimers and fine print.</Text>
              <Text variant="caption" color="secondary">Caption text in secondary color.</Text>
              <Text variant="body" color="danger">Danger colored text.</Text>
              <Text variant="body" color="success">Success colored text.</Text>
            </div>
          </div>
        </Card>

        {/* Icons Section */}
        <Card>
          <div className="p-6">
            <Text variant="h2" className="mb-6">Icons</Text>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
              <div className="flex flex-col items-center space-y-2">
                <Icon name="check" color="success" />
                <Text variant="caption">Check</Text>
              </div>
              <div className="flex flex-col items-center space-y-2">
                <Icon name="error" color="danger" />
                <Text variant="caption">Error</Text>
              </div>
              <div className="flex flex-col items-center space-y-2">
                <Icon name="close" />
                <Text variant="caption">Close</Text>
              </div>
              <div className="flex flex-col items-center space-y-2">
                <Icon name="info" color="primary" />
                <Text variant="caption">Info</Text>
              </div>
              <div className="flex flex-col items-center space-y-2">
                <Icon name="warning" color="warning" />
                <Text variant="caption">Warning</Text>
              </div>
              <div className="flex flex-col items-center space-y-2">
                <Icon name="arrow" />
                <Text variant="caption">Arrow</Text>
              </div>
            </div>
          </div>
        </Card>

        {/* Text Editor Section */}
        <Card>
          <div className="p-6">
            <Text variant="h2" className="mb-6">Text Editor</Text>
            <div className="space-y-4">
              <div>
                <Label htmlFor="editor1">Rich Text Editor</Label>
                <TextEditor
                  placeholder="Start writing your story..."
                  value={textEditorValue}
                  onChange={setTextEditorValue}
                  minHeight="200px"
                  fontSize="md"
                  lineHeight="relaxed"
                />
              </div>
              
              <div>
                <Label htmlFor="editor2">Compact Editor</Label>
                <TextEditor
                  placeholder="Compact editor..."
                  fontSize="sm"
                  lineHeight="tight"
                  minHeight="100px"
                />
              </div>
            </div>
          </div>
        </Card>

        {/* Modal Section */}
        <Card>
          <div className="p-6">
            <Text variant="h2" className="mb-6">Modal</Text>
            <div className="space-y-4">
              <Button onClick={() => setModalOpen(true)}>
                Open Modal
              </Button>
              
              <Modal
                open={modalOpen}
                onClose={() => setModalOpen(false)}
                header="Sample Modal"
                size="md"
                footer={
                  <div className="flex gap-2">
                    <Button variant="outline" onClick={() => setModalOpen(false)}>
                      Cancel
                    </Button>
                    <Button variant="primary" onClick={() => setModalOpen(false)}>
                      Save Changes
                    </Button>
                  </div>
                }
              >
                <div className="space-y-4">
                  <Text variant="body">
                    This is a sample modal with header and footer. You can put any content here.
                  </Text>
                  <Input placeholder="Sample input in modal" />
                </div>
              </Modal>
            </div>
          </div>
        </Card>

        {/* Container Section */}
        <Card>
          <div className="p-6">
            <Text variant="h2" className="mb-6">Containers</Text>
            <div className="space-y-6">
              <div>
                <Text variant="h3" className="mb-2">Small Container</Text>
                <Container size="sm" className="bg-gray-100 p-4">
                  <Text variant="body">Content in small container</Text>
                </Container>
              </div>
              
              <div>
                <Text variant="h3" className="mb-2">Medium Container</Text>
                <Container size="md" className="bg-gray-100 p-4">
                  <Text variant="body">Content in medium container</Text>
                </Container>
              </div>
              
              <div>
                <Text variant="h3" className="mb-2">Large Container</Text>
                <Container size="lg" className="bg-gray-100 p-4">
                  <Text variant="body">Content in large container</Text>
                </Container>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </Container>
  );
};

export default UIShowcase;
