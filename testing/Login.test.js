import { render, screen } from '@testing-library/react';
import Login from '../src/Components/Login';

const testingProps = { apiKey: 'apiKey', organization: 'organization', setUpdate: jest.fn(), modelsList: {} };

test('renders login component', () => {
    const { apiKey, organization, setUpdate, modelsList } = testingProps;
    render(<Login apiKey={apiKey} organization={organization} setUpdate={setUpdate} modelsList={modelsList} />);
    const linkElement = screen.getByText(/Login/i);
    expect(linkElement).toBeInTheDocument();
});

test('should fire handleSubmit when submit button is clicked', () => {
    const { apiKey, organization, setUpdate, modelsList } = testingProps;
    let apiinput = '';
    let orginput = '';
    const handleSubmit = jest.fn((e) => {
        apiinput = e.currentTarget.apiKey.value;
        orginput = e.currentTarget.organization.value;
    });
    render(<Login apiKey={apiKey} organization={organization} setUpdate={setUpdate} modelsList={modelsList} />);
    const apiKeyInput = screen.getByLabelText('OpenAI API Key');
    const organizationInput = screen.getByLabelText('OpenAI Organization');
    const submitButton = screen.getByRole('button');
    expect(apiKeyInput).toBeInTheDocument();
    expect(organizationInput).toBeInTheDocument();
    expect(submitButton).toBeInTheDocument();
    expect(handleSubmit).toHaveBeenCalledTimes(0);
    apiKeyInput.value = 'test';
    organizationInput.value = 'test';
    submitButton.click();
    expect(handleSubmit).toHaveBeenCalledTimes(1);
    expect(apiinput).toBe('test');
    expect(orginput).toBe('test');
});
