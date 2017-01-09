import Sleep from '../common/Sleep'

const checkNeeds = function(values) {
    let success = true;
    if (values.typeOfCover) {
        if (values.typeOfCover.id === 1) {
            // Single trip
            if (values.singleDestination.id === 3) {
                success = false;
            }

        } else if (values.typeOfCover.id === 2) {
            // Multi trip
            if (values.multiDestination.id === 3) {
                success = false;
            }

        }
    }
    let quotes = [
        {
            id: 1
            , title: 'Quote1'
            , coverages: [
            'coverage1'
            , 'coverage2'
        ]
        }
        , {
            id: 2
            , title: 'Quote2'
            , coverages: [
                'coverage1'
                , 'coverage2'
                , 'coverage3'
            ]
        }
    ]
    return Sleep(success, quotes, 2000) // simulate server latency
}

export {checkNeeds}