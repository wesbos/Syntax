import ls from './localstorage-object'

function upgradeLocalStorage() {
  const { newItems } = convertOldLsItemsToNewLsItems(ls.getAll())
  ls.clear()
  ls.apply(newItems)
}

function convertOldLsItemsToNewLsItems(oldItemsSource) {
  const oldItems = { ...oldItemsSource }
  const newItems = {}
  Object.entries(oldItems).filter(([oldKey]) => oldKey.startsWith('lastPlayed')).forEach(([oldKey, oldValue]) => {
    const newKey = oldKey.replace('lastPlayed', 'currentTime')
    const newValue = oldValue.lastPlayed
    newItems[newKey] = newValue
    delete oldItems[oldKey]
  })

  if (oldItems.lastVolumeSetting) {
    newItems.currentVolume = oldItems.lastVolumeSetting.lastVolumePref
    delete oldItems.lastVolumeSetting
  }
  if (oldItems.lastPlaybackSetting) {
    newItems.playbackRate = oldItems.lastPlaybackSetting.lastPlaybackRate
    delete oldItems.lastPlaybackSetting
  }
  if (oldItems.lastVolumeSetting) {
    newItems.currentVolume = oldItems.lastVolumeSetting.lastVolumePref
    delete oldItems.lastVolumeSetting
  }

  Object.assign(newItems, oldItems)

  return { oldItemsSource, newItems }

}

export default upgradeLocalStorage