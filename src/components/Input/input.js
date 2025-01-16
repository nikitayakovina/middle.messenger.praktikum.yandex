import './input.scss';

export default `
    <div class="form-field" id="form-field">
        <input class="form-field__input" id="{{ id }}" name="{{ name }}" type="{{ type }}" placeholder="" value="{{ value }}">
        <label class="form-field__label" for="{{ labelFor }}">{{ label }}</label>
    </div>
`;
