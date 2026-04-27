export default function renderTechnicalSpecs() {
    const target = document.getElementById('spec-table-target') || document.getElementById('specs-table-target');
    const container = document.getElementById('technical-specs-container');
    const metafields = window.productMetafields;


    if (!metafields || !Array.isArray(metafields) || metafields.length === 0) {
        if (container) container.style.display = 'none';
        return;
    }

    try {
        const rawJson = metafields[0].node.value;
        const specs = JSON.parse(rawJson);

        let html = '<table class="table" style="width:100%; border-collapse: collapse; margin-top: 20px; border: 1px solid #dfe3e8;">';
        
        specs.forEach(group => {
            html += `
                <thead>
                    <tr>
                        <th colspan="2" style="background-color: #f5f7fa; padding: 12px; text-align: left; border-bottom: 2px solid #dfe3e8; color: #333;">
                            ${group.group}
                        </th>
                    </tr>
                </thead>
                <tbody>
            `;
            
            group.attributes.forEach(attr => {
                const unit = attr.unit ? ` ${attr.unit}` : '';
                html += `
                    <tr style="border-bottom: 1px solid #dfe3e8;">
                        <td style="width: 35%; font-weight: 600; padding: 10px; color: #555; background-color: #fafbfc;">${attr.label}</td>
                        <td style="padding: 10px; color: #333;">${attr.value}${unit}</td>
                    </tr>
                `;
            });

            html += '</tbody>';
        });

        html += '</table>';

        target.innerHTML = html;
        if (container) {
            container.style.display = 'block';
        }
    } catch (error) {
        console.error("spec-render.js: Грешка при обработка на JSON податоците:", error);
        if (container) container.style.display = 'none';
    }
}