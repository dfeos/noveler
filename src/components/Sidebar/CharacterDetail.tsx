import React, { useState } from 'react';
import { Character } from '../../types';
import { Button, Input, TextEditor, Container, Text, Icon, Card, Modal } from '../../ui-library';
import './character-detail.css';

interface CharacterDetailProps {
  character: Character;
  onUpdate: (character: Character) => void;
  onClose: () => void;
}

const CharacterDetail: React.FC<CharacterDetailProps> = ({
  character,
  onUpdate,
  onClose
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedCharacter, setEditedCharacter] = useState<Character>(character);

  const handleSave = () => {
    onUpdate(editedCharacter);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditedCharacter(character);
    setIsEditing(false);
  };

  const getCharacterIcon = (role: Character['role']) => {
    switch (role) {
      case 'protagonist': return '🦸';
      case 'antagonist': return '🦹';
      case 'supporting': return '👥';
      case 'minor': return '👤';
      default: return '👤';
    }
  };

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString();
  };

  return (
    <Modal
      isOpen={true}
      onClose={onClose}
      title="Character Details"
      size="lg"
    >
      <Container className="character-detail-content">
        <Container className="character-title">
          <Container className="character-avatar-large">
            {character.imageUrl ? (
              <img src={character.imageUrl} alt={character.name} />
            ) : (
              <Icon name={getCharacterIcon(character.role)} className="character-icon-large" />
            )}
          </Container>
          <Container className="character-title-info">
            {isEditing ? (
              <Input
                type="text"
                value={editedCharacter.name}
                onChange={(e) => setEditedCharacter({
                  ...editedCharacter,
                  name: e.target.value
                })}
                className="character-name-input"
              />
            ) : (
              <Text variant="h2">{character.name}</Text>
            )}
            <Text variant="small" className={`role-badge-large ${character.role}`}>
              {character.role}
            </Text>
          </Container>
        </Container>

        <Container className="character-actions">
          {isEditing ? (
            <>
              <Button onClick={handleSave} variant="primary">Save</Button>
              <Button onClick={handleCancel} variant="secondary">Cancel</Button>
            </>
          ) : (
            <Button onClick={() => setIsEditing(true)} variant="outline">Edit</Button>
          )}
        </Container>

        <Card className="character-section">
          <Text variant="h3">Basic Information</Text>
          <Container className="character-grid">
            <Container className="character-field">
              <Text variant="small" weight="medium">Age</Text>
              {isEditing ? (
                <Input
                  type="number"
                  value={editedCharacter.age?.toString() || ''}
                  onChange={(e) => setEditedCharacter({
                    ...editedCharacter,
                    age: e.target.value ? parseInt(e.target.value) : undefined
                  })}
                />
              ) : (
                <Text variant="small">{character.age || 'Not specified'}</Text>
              )}
            </Container>
            <Container className="character-field">
              <Text variant="small" weight="medium">Role</Text>
              {isEditing ? (
                <select
                  value={editedCharacter.role}
                  onChange={(e) => setEditedCharacter({
                    ...editedCharacter,
                    role: e.target.value as Character['role']
                  })}
                >
                  <option value="protagonist">Protagonist</option>
                  <option value="antagonist">Antagonist</option>
                  <option value="supporting">Supporting</option>
                  <option value="minor">Minor</option>
                </select>
              ) : (
                <Text variant="small" className={`role-badge ${character.role}`}>
                  {character.role}
                </Text>
              )}
            </Container>
          </Container>
        </Card>

        <Card className="character-section">
          <Text variant="h3">Description</Text>
          {isEditing ? (
            <TextEditor
              value={editedCharacter.description}
              onChange={(value) => setEditedCharacter({
                ...editedCharacter,
                description: value
              })}
              minHeight="100px"
            />
          ) : (
            <Text variant="p">{character.description}</Text>
          )}
        </Card>

        {(character.appearance || isEditing) && (
          <Card className="character-section">
            <Text variant="h3">Appearance</Text>
            {isEditing ? (
              <TextEditor
                value={editedCharacter.appearance || ''}
                onChange={(value) => setEditedCharacter({
                  ...editedCharacter,
                  appearance: value
                })}
                placeholder="Describe the character's physical appearance..."
                minHeight="100px"
              />
            ) : (
              <Text variant="p">{character.appearance}</Text>
            )}
          </Card>
        )}

        {(character.personality || isEditing) && (
          <Card className="character-section">
            <Text variant="h3">Personality</Text>
            {isEditing ? (
              <TextEditor
                value={editedCharacter.personality || ''}
                onChange={(value) => setEditedCharacter({
                  ...editedCharacter,
                  personality: value
                })}
                placeholder="Describe the character's personality traits..."
                minHeight="100px"
              />
            ) : (
              <Text variant="p">{character.personality}</Text>
            )}
          </Card>
        )}

        {(character.background || isEditing) && (
          <Card className="character-section">
            <Text variant="h3">Background</Text>
            {isEditing ? (
              <TextEditor
                value={editedCharacter.background || ''}
                onChange={(value) => setEditedCharacter({
                  ...editedCharacter,
                  background: value
                })}
                placeholder="Describe the character's background and history..."
                minHeight="120px"
              />
            ) : (
              <Text variant="p">{character.background}</Text>
            )}
          </Card>
        )}

        {(character.notes || isEditing) && (
          <Card className="character-section">
            <Text variant="h3">Notes</Text>
            {isEditing ? (
              <TextEditor
                value={editedCharacter.notes || ''}
                onChange={(value) => setEditedCharacter({
                  ...editedCharacter,
                  notes: value
                })}
                placeholder="Additional notes about the character..."
                minHeight="100px"
              />
            ) : (
              <Text variant="p">{character.notes}</Text>
            )}
          </Card>
        )}

        <Card className="character-section">
          <Text variant="h3">Metadata</Text>
          <Container className="character-metadata">
            <Container className="metadata-item">
              <Text variant="small" weight="medium">Created</Text>
              <Text variant="small">{formatDate(character.createdAt)}</Text>
            </Container>
            <Container className="metadata-item">
              <Text variant="small" weight="medium">Last Updated</Text>
              <Text variant="small">{formatDate(character.updatedAt)}</Text>
            </Container>
          </Container>
        </Card>
      </Container>
    </Modal>
  );
};

export default CharacterDetail;
