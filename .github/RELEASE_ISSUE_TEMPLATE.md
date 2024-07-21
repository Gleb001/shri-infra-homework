# Release ${{ VERSION }}

**Дата:** ${{ env.DATE }}
**Автор релиза:** ${{ env.AUTHOR }}
**Номер версии:** ${{ env.VERSION }}

**Список коммитов от предыдущего релизного тега:**
${{ env.COMMITS }}

**Ссылка на docker-образ:**
`cr.yandex/${{ env.ID_REGISTRY }}/app:${{ env.VERSION }}`