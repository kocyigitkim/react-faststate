
export class DynoValue {
    constructor(reference, fieldName, component) {
        this.reference = reference;
        this.fieldName = fieldName;
        this.component = component;
    }
    read(component) {
        if (!this.component && component) {
            this.component = component;
            var list = this.reference.fieldReferences[this.fieldName];
            var duplicates = [];
            for (var i = 0; i < list.length; i++) {
                var item = list[i];
                if (!item || (item.component === this.component && item.reference === this.reference)) {
                    duplicates.push(i);
                }
            }
            for (var i = duplicates.length - 1; i > 0; i--) {
                list.splice(duplicates[i], 1);
            }
        }
        return this.reference.fields[this.fieldName];
    }
    write(value) {
        this.reference.fields[this.fieldName] = value;
    }
    writeUpdate(value) {
        this.write(value);
        this.update();
    }
    update() {
        this.reference.update(this.fieldName);
    }
}

export class DynoState {
    constructor() {
        this.fields = {};
        this.fieldReferences = {};
    }
    tryInitField(component, name) {
        if (this.fieldReferences[name] === undefined) {
            this.fieldReferences[name] = [];
        }
        if (component) {
            const originalUnmount = component.componentWillUnmount;
            component.componentWillUnmount = (function (originalUnmount, _state, name) {
                var references = _state.fieldReferences[name];
                if (references) {
                    references.splice(0, references.length);
                }
                if (originalUnmount) originalUnmount();
            }).bind(component, originalUnmount, this, name);
        }
        return this.fieldReferences[name];
    }
    value(component, name) {
        const fieldRef = this.tryInitField(component, name);
        var val = new DynoValue(this, name, component);
        fieldRef.push(val);
        return val;
    }
    set(name, value) {
        this.tryInitField(null, name);
        this.fields[name] = value;
    }
    setAll(data) {
        for (var k in data) {
            this.set(k, data[k]);
        }
        this.update();
    }
    update(name) {
        if (name !== undefined && name !== null) {
            this.fieldReferences[name].forEach(field => {
                if (field.component)
                    field.component.forceUpdate();
            });
        }
        else {
            for (var refList of Object.values(this.fieldReferences)) {
                for (var field of refList) {
                    if (field.component) field.component.forceUpdate();
                }
            }
        }
    }
}